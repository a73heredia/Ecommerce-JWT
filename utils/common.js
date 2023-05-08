import dotenv from 'dotenv';

dotenv.config();

export default class CommonsUtils {
   static buildResponse(data){
      return {
        status: 'success',
        payload: data.docs,
        totalPages: data.totalPages,
        prevPage: data.prevPage,
        nextPage: data.nextPage,
        page: data.page,
        hasPrevPage: data.hasPrevPage,
        hasNextPage: data.hasNextPage,
        prevLink: !data.hasPrevPage ? null : `${process.env.BASE_URL}/products?limit=${data.limit}&page=${data.prevPage}`,
        nextLink: !data.hasNextPage ? null : `${process.env.BASE_URL}/products?limit=${data.limit}&page=${data.nextPage}`,
      }
    }
  } 
