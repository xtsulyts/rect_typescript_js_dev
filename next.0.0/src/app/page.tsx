import Form from "./components/Form";
import Card, {CardBody} from "./components/Card"
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";


export default function Home() {
  return (
    <>
     <NavBar></NavBar>
        <Card>        
          <CardBody title="VISUALIZA" text="CREALO"></CardBody>
      </Card>
      <Form/>
      <Footer enlaces="hola"></Footer>
        
        
    </>

  );
}
