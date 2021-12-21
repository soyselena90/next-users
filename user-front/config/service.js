class fetchAPI {
   constructor(httpData) {
      this.datas = httpData;
   }

   async getData(dataurl) {
      const response = await this.datas.get(dataurl);
      return response.data.data;
   }
   async postData(dataurl) {
      const response = await this.datas.post(dataurl);
      return response.data.data;
   }
}

export default fetchAPI;
