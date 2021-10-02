import { createRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';

interface ModalEditFoodProps {
  setIsOpen: () => void;
  handleUpdateFood: (data:any) => void;
  isOpen: boolean;
  editingFood: {
    image: string;
    name: string;
    description: string;
    price: string;
    id: number;
    available: boolean;
  } | undefined;
}

function ModalEditFood(props:ModalEditFoodProps) {
  const formRef = createRef<any>();

  const handleSubmit = async (data:any) => {
    const { setIsOpen, handleUpdateFood } = props;

    handleUpdateFood(data);
    setIsOpen();
  };

  return (
    <Modal isOpen={props.isOpen} setIsOpen={props.setIsOpen}>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={props.editingFood}>
          <h1>Editar Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" />

          <Input name="name" placeholder="Ex: Moda Italiana" />
          <Input name="price" placeholder="Ex: 19.90" />

          <Input name="description" placeholder="Descrição" />

          <button type="submit" data-testid="edit-food-button">
            <div className="text">Editar Prato</div>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
  )
}

export default ModalEditFood;
