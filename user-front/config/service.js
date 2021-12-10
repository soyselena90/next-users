class fetchAPI {
   constructor(httpData) {
      this.datas = httpData;
   }

   async getData(dataurl) {
      const response = await this.datas.get(dataurl);
      return response.data;
   }
   async putData(dataurl) {
      const response = await this.datas.post(dataurl);
      return response.data.data;
   }
}

export default fetchAPI;
