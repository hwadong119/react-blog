import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebaseApp";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";

// PostList 컴포넌트의 props 인터페이스 정의
interface PostListProps {
  hasNavigation?: boolean;
  defaultTab?: TabType;
}

// 탭 타입 정의
type TabType = "all" | "my";

// 게시글 속성 인터페이스 정의의
export interface PostProps {
  id?: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  uid: string;
}

export default function PostList({
  hasNavigation = true,
  defaultTab = "all",
}: PostListProps) {
  // 현재 활성화된 탭 상태 관리
  const [activeTab, setActiveTab] = useState<TabType>(defaultTab);
  // 게시글 목록 상태 관리
  const [posts, setPosts] = useState<PostProps[]>([]);
  // 사용자 정보 가져오기
  const { user } = useContext(AuthContext);

  // Firestore에서 게시글 데이터를 가져오는 함수수
  const getPosts = async () => {
    setPosts([]);

    let postsRef = collection(db, "posts");
    let postsQuery;

    if (activeTab === "my" && user) {
      // 나의 글만 필터링
      postsQuery = query(
        postsRef,
        where("uid", "==", user.uid),
        orderBy("createdAt", "asc")
      );
    } else {
      // 모든 글 보여주기
      postsQuery = query(postsRef, orderBy("createdAt", "desc"));
    }

    const datas = await getDocs(postsQuery);

    datas?.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, dataObj as PostProps]);
    });
  };

  // 컴포넌트가 마운트 될 때 'getPosts' 함수를 호출하여 데이터를 가져옴옴
  useEffect(() => {
    getPosts();
  }, [activeTab]);

  // 게시글 삭제 핸들러
  const handleDelete = async (id: string) => {
    const confirm = window.confirm("해당 게시글을 삭제하겠습니까?");

    if (confirm && id) {
      await deleteDoc(doc(db, "posts", id));

      toast.success("게시글을 삭제했습니다.");
    }
  };

  console.log(posts);

  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div
            role="presentation"
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "post__navigation--active" : ""}
          >
            전체
          </div>
          <div
            role="presentation"
            onClick={() => setActiveTab("my")}
            className={activeTab === "my" ? "post__navigation--active" : ""}
          >
            나의 글
          </div>
        </div>
      )}
      <div className="post__list">
        {posts?.length > 0 ? (
          posts?.map((post, index) => (
            <div key={post?.id} className="post__box">
              <Link to={`/posts/${post?.id}`}>
                <div className="post__profile-box">
                  <div className="post__profile" />
                  <div className="post__author-name">{post.email}</div>
                  <div className="post__date">{post.createdAt}</div>
                </div>
                <div className="post__title">{post.title}</div>
                <div className="post__text">{post.summary}</div>
              </Link>
              {post?.email === user?.email && (
                <div className="post__utils-box">
                  <div
                    className="post__delete"
                    role="presentation"
                    onClick={() => handleDelete(post.id as string)}
                  >
                    삭제
                  </div>
                  <div className="post__edit">
                    <Link to={`/posts/edit/${post?.id}`}>수정</Link>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="post__no-post">게시글이 없습니다.</div>
        )}
      </div>
    </>
  );
}
