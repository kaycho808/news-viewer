import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import NewsItem from './NewsItem';
import { FiLoader } from 'react-icons/fi';
import { BiError } from 'react-icons/bi';
import usePromise from '../lib/usePromise';

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({ category }) => {
  const [loading, response, error] = usePromise(() => {
    const query = category === 'all' ? '' : `&category=${category}`;
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=cda65681511a4a459a55173f3c563e86`,
    );
  }, [category]);

  // 대기 중일 때
  if (loading) {
    return (
      <NewsListBlock>
        대기 중...
        <FiLoader />
      </NewsListBlock>
    );
  }
  // 아직 response 값이 설정되지 않았을 때,
  if (!response) {
    return null;
  }
  // 에러 발생시
  if (error) {
    return (
      <NewsListBlock>
        에러 발생! <BiError />
      </NewsListBlock>
    );
  }

  // articles 값이 유효할 때
  const { articles } = response.data;
  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
