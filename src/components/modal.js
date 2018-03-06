
import React from 'react';
var Modal = require('react-bootstrap-modal')
class ModalExample extends React.Component {
 
  render(){
    let closeModal = () =>{

        // this.setState({ open: false })
    } 
    
    
 
    let saveAndClose = () => {
    //   api.saveData()
    //     .then(() => this.setState({ open: false }))
    }
 
    return (
      <div>
        <button type='button'>Launch modal</button>
 
        <Modal
          show={this.state.open}
          onHide={closeModal}
          aria-labelledby="ModalHeader"
        >
          
        </Modal>
      </div>
    )
  }
}

export default ModalExample;