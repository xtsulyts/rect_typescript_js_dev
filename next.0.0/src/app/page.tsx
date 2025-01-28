import Form from "./components/Form";
import Card, {CardBody} from "./components/Card"
import List from "./components/List";


export default function Home() {
  return (
    <>
        <Card>
          <CardBody title="VISUALIZA" text="CREALO"></CardBody>
          <List></List>
        </Card>
        <Form/>
    </>

  );
}
