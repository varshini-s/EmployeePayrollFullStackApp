const axios=require('axios').default;

class AxiosService{

    postService(url,employee)
    {
      
        return axios.post(url,employee)
    }

    getService(url='')
    {
        return   axios.get(url)
    }

    putService(url='',data)
    {
        return  axios.put(url,data)
    }

    deleteService(url='')
    {
        return  axios.delete(url);
        
    }
}

module.exports= new AxiosService()