import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { useEffect, useState } from 'react';

interface FoodProps {
  image: string;
  name: string;
  description: string;
  price: string;
  id: number;
  available: boolean;
}

interface EditingFoodProps {
    image: string;
    name: string;
    description: string;
    price: string;
    id: number;
    available: boolean;
}

function Dashboard() {
  const [foods, setFoods] = useState<FoodProps[]>([]);
  const [editingFood, setEditingFood] = useState<FoodProps | undefined>();
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function getFoods(){
      const response = await api.get('/foods');
      setFoods(response.data)
    }
    getFoods()
  }, []);

  const handleAddFood = async (food:FoodProps) => {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      const newFood = response.data
      const newFoods = { ...foods, newFood }

      setFoods(newFoods);
    } catch (err) {
      console.log(err);
    }
  }  

  const handleUpdateFood = async (food:EditingFoodProps) => {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood?.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated)
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteFood = async (id:number) => {

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen)
  }

  const handleEditFood = (food:EditingFoodProps) => {
    setEditModalOpen(true)
    setEditingFood({...food})
  }

  return (
    <>
        <Header openModal={toggleModal} />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          editingFood={editingFood}
          setIsOpen={toggleEditModal}
          handleUpdateFood={handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map((food:FoodProps) => (
              <Food
                key={food.id}
                food={food}
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
              />
            ))}
        </FoodsContainer>
      </>
  )
}

export default Dashboard;
