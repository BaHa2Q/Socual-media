
// import { useState, useEffect } from 'react';

// const useInfiniteScroll = (callback) => {
//   const [isFetching, setIsFetching] = useState(false);
  

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
  
//   useEffect(() => {
//     if (!isFetching) return;
//     callback();
//   }, []);

//   function handleScroll(e) {
//     if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight !== isFetching) return;
//     setTimeout(() => {
//       setIsFetching(true);
//     }, 1000);

//   }

//   return [isFetching, setIsFetching];
// };

// export default useInfiniteScroll;