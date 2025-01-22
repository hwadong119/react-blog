import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PostProps } from "./PostList";
import { db } from "../firebaseApp";
import { doc, getDoc } from "firebase/firestore";
import Loader from "./Loader";

export default function PostDetail() {
  // 게시글 상태 관리
  const [post, setPost] = useState<PostProps | null>(null);
  // URL 파라미터 가져오기
  const params = useParams();

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
  const handleDelete = () => {
    console.log("delete");
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
            <div className="post__date">{post?.createAt}</div>
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
              <Link to={`/posts/edit/1`}>수정</Link>
            </div>
          </div>
          <div className="post__text post__text--pre-wrap">{post?.content}</div>
        </div>
      </div>
    </>
  );
}
