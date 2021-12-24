class fetchAPI {
   constructor(httpData) {
      // console.log("httpData :", httpData.);
      this.datas = httpData;
   }

   async getData(dataname, param = null) {
      const response = await this.datas.get(dataname, {
         params: {
            id: param,
         },
      });

      return response.data.data;
   }
   async postData(dataurl) {
      const response = await this.datas.post(dataurl);
      return response.data.data;
   }
}

export default fetchAPI;
