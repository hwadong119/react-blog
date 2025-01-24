import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { PostProps } from "./PostList";
import { db } from "../firebaseApp";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import Loader from "./Loader";
import { toast } from "react-toastify";

export default function PostDetail() {
  // 게시글 상태 관리
  const [post, setPost] = useState<PostProps | null>(null);
  // URL 파라미터 가져오기
  const params = useParams();
  const navigate = useNavigate();

  // 특정 ID의 게시글 데이터를 Firestore에서 가져오는 함수
  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      // 가져온 데이터를 상태에 저장
      setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
    }
  };

  // 게시글 삭제 핸들러
  const handleDelete = async () => {
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
    if (confirm && post && post.id) {
      await deleteDoc(doc(db, "posts", post.id));
      toast.success("게시글을 삭제했습니다.");
      navigate("/");
    }
  };

  // 컴포넌트가 마운트될 때 또는 URL 파라미터가 변경될 때 게시글 데이터를 가져옴
  useEffect(() => {
    if (params?.id) getPost(params.id);
  }, [params?.id]);

  return (
    <>
      <div className="post__detail">
        {post ? "" : <Loader />}
        <div className="post__box">
          <div className="post__title">{post?.title}</div>
          <div className="post__profile-box">
            <div className="post__profile" />
            <div className="post__author-name">{post?.email}</div>
            <div className="post__date">{post?.createdAt}</div>
          </div>
          <div className="post__utils-box">
            <div
              className="post__delete"
              role="presentation"
              onClick={handleDelete}
            >
              삭제
            </div>
            <div className="post__edit">
              <Link to={`/posts/edit/${post?.id}`}>수정</Link>
            </div>
          </div>
          <div className="post__text post__text--pre-wrap">{post?.content}</div>
        </div>
      </div>
    </>
  );
}
