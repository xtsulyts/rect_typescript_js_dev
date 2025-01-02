import { useFetch } from './hooks';
import './App.css'
//import { Button } from './component/button';

const url = "https://app.ripio.com/my-wallet";

interface Data {
  name: string;
  lastName: string;
  age: number;
}

function App() {
  const { data, error, loading } = useFetch<Data>(url)
  data?.age
  data?.name
  data?.lastName

  
  
  if (loading) {
    return <div>Loading.....</div>
  }

  if (error) {
    return <div>Ups hay un error: {error.message}</div>
  }
  
  return (
    <div>{JSON.stringify(data)}</div>
  ) 
}

export default App
 
// return (
//   <>

//       <Button label={`Count is ${count}`} parentMethod={countMore}/>
//       <p>{name}</p>
//       <Button label={`Mi nombre es ${name}`} parentMethod={changeName}/>
      
//   </>
