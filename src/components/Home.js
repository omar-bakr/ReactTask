import React from 'react';
import axios from 'axios';
import { Card, ListGroup,Col,Row,Spinner, Button,Media,Modal} from "react-bootstrap";
import  './Home.css'


class Home extends React.Component {
    state={
        users:[],
        loading:true,
        show:false,
        currentUser:"",
        deleted:false
    };
  
  

    componentDidMount=()=>{
      axios.get("https://test-be.dailymealz.app/api/json/test/users")
      .then(res=>{
          this.setState({users:res.data});
          this.setState({loading:false});
      });
    }
    
    delete=(id)=>{
        axios.put('https://test-be.dailymealz.app/api/json/test/users/'+id)
      .then(res=>{
        this.setState({deleted:true});

      })
      .catch(err=>{
          console.log(err);
      });
    }

  showMore=(id)=>{
    this.setState({show:true});
    this.setState({currentUser:this.state.users.find(user=>id===user.id)});
  }

  render(){
      if(this.state.loading)
      {
          return(
            <Spinner animation="border" />
          );
      }
      
      return(
        <Card id='card'style={{ width: '22.5rem' ,height:'49rem',borderRadius:'40px',overflowY: 'scroll'}}>
          <ListGroup variant="flush">
              {this.state.users.map(user=>
              <ListGroup.Item>
                <Media>
                  <img
                    width={64}
                    height={64}
                    className="mr-3"
                    src={user.image_url}
                    alt="Generic placeholder"
                  />
                  <Media.Body>
                  <Row>Name:{user.first_name} {user.last_name}</Row>
                  <Row>Phone:{user.phone}</Row>
                  <Row>Company:{user.company}</Row>
                  <Row>
                      <Col>
                        <Button variant="danger"  size="sm" onClick={()=>this.delete(user.id)}>Delete</Button>
                      </Col>
                      <Col>
                        <Button
                          variant="primary" 
                          size="sm"
                          onClick={()=>{this.showMore(user.id)}}>
                          more..
                        </Button>
                      </Col>
                   </Row>
                  </Media.Body>
                </Media>
              </ListGroup.Item>)}
              <Modal show={this.state.show} onHide={()=>{this.setState({show:false})}}>
              <Modal.Header closeButton>
              <Modal.Title>
                {this.state.show?this.state.currentUser.first_name +' '+this.state.currentUser.last_name:""}
              </Modal.Title>
              </Modal.Header>
              <Modal.Body>
              {this.state.show?'Gender: '+this.state.currentUser.gender:""}
              <br/>
              {this.state.show?'Email: '+this.state.currentUser.email:""}

              </Modal.Body>
              </Modal>

              <Modal show={this.state.deleted} onHide={()=>{this.setState({deleted:false})}}>
              <Modal.Header closeButton>
              <Modal.Title>
                Alert Message
              </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h5>
                 User Deleted Successfully
                 </h5>
              </Modal.Body>
              </Modal>
          </ListGroup>
         </Card>
    );
      
    
  }
}
export default Home;
