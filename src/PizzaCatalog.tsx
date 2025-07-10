import { useEffect, useState } from 'react';
import { IngredientsDic, type CatalogResponse, type Pizza } from "./types";
import './PizzaCatalog.css';
import { Modal } from 'antd';

const apiRoot = 'https://shift-intensive.ru/api';
const catalogUrl = apiRoot + '/pizza/catalog';

const PizzaCatalog = () => {
  const [catalog, setCatalog] = useState<Pizza[]>([]);
  const [selectedPizza, setSelectedPizza] = useState<Pizza | undefined>();

  useEffect(() => {
    fetch(catalogUrl)
      .then((response: Response) => {
        return response.json() as Promise<CatalogResponse>;
      })
      .then((data: CatalogResponse) => {
        setCatalog(data.catalog);
      });
  }, []);

  return (
    <div className='catalog-container'>
      {catalog.map((pizza) => (
        <div key={pizza.id} className='pizza-card'>
          <img src={apiRoot + pizza.img} alt={pizza.name} />
          <div className="pizza-name">{pizza.name}</div>
          <div className='pizza-description'>
            {pizza.description}
          </div>
          <div className='pizza-price'>от {pizza.sizes[0].price} р</div>
          <button className='select-button' onClick={() => setSelectedPizza(pizza)}>Выбрать</button>
        </div>
      ))}
      {selectedPizza && <PizzaModal pizza={selectedPizza} onClose={() => setSelectedPizza(undefined)} />}
    </div>
  );
};

const PizzaModal = ({ pizza, onClose }: { pizza: Pizza, onClose: () => void }) => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>(pizza.sizes[0].type);
  const [selectedDough, setSelectedDough] = useState<string>(pizza.doughs[0].type);

  const handleIngredientToggle = (id: string) => {
    setSelectedIngredients(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleToppingToggle = (id: string) => {
    setSelectedToppings(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleSizeChange = (type: string) => {
    setSelectedSize(type);
  };

  const handleDoughChange = (type: string) => {
    setSelectedDough(type);
  };

  const calculateTotalPrice = () => {
    const basePrice = pizza.sizes.find(s => s.type === selectedSize)?.price || 0;
    const ingredientPrice = selectedIngredients.reduce((sum, id) => sum + (pizza.ingredients.find(i => i.type === id)?.price || 0), 0);
    const toppingPrice = selectedToppings.reduce((sum, id) => sum + (pizza.toppings.find(t => t.type === id)?.price || 0), 0);
    const doughPrice = pizza.doughs.find(d => d.type === selectedDough)?.price || 0;
    return basePrice + ingredientPrice + toppingPrice + doughPrice;
  };

  return (
    <Modal
      className='pizza-modal'
      title={pizza.name}
      open={true}
      onCancel={onClose}
      closable
      footer={null}
    >
      <img src={apiRoot + pizza.img} style={{ width: '100%', height: 'auto' }} alt={pizza.name} />
      <div className='pizza-description'>
        {pizza.description}
      </div>
      <div className='pizza-ingridients'>
        <p>Ингредиенты:</p>
        {pizza.ingredients.map((ingredient) => (
          <div
            key={ingredient.type}
            className={`pizza-ingridient ${selectedIngredients.includes(ingredient.type) ? 'selected' : ''}`}
            onClick={() => handleIngredientToggle(ingredient.type)}
          >
            <img src={apiRoot + (ingredient.img || '')} alt={ingredient.type} />
            <div className="ingridient-type">{IngredientsDic[ingredient.type] || ingredient.type}</div>
            <div className='ingridient-price'>{ingredient.price} р</div>
          </div>
        ))}
      </div>
      <div className='pizza-ingridients'>
        <p>Топинги:</p>
        {pizza.toppings.map((topping) => (
          <div
            key={topping.type}
            className={`pizza-ingridient ${selectedToppings.includes(topping.type) ? 'selected' : ''}`}
            onClick={() => handleToppingToggle(topping.type)}
          >
            <img src={apiRoot + (topping.img || '')} alt={topping.type} />
            <div className="ingridient-type">{IngredientsDic[topping.type] || topping.type}</div>
            <div className='ingridient-price'>{topping.price} р</div>
          </div>
        ))}
      </div>
      <div className='pizza-ingridients'>
        <p>Размеры:</p>
        {pizza.sizes.map((size) => (
          <div
            key={size.type}
            className={`pizza-ingridient ${selectedSize === size.type ? 'selected' : ''}`}
            onClick={() => handleSizeChange(size.type)}
          >
            <div className="ingridient-type">{size.type}</div>
            <div className='ingridient-price'>{size.price} р</div>
          </div>
        ))}
      </div>
      <div className='pizza-ingridients'>
        <p>Варианты теста:</p>
        {pizza.doughs.map((dough) => (
          <div
            key={dough.type}
            className={`pizza-ingridient ${selectedDough === dough.type ? 'selected' : ''}`}
            onClick={() => handleDoughChange(dough.type)}
          >
            <div className="ingridient-type">{dough.type}</div>
            <div className='ingridient-price'>{dough.price > 0 ? `${dough.price} р` : 'Бесплатно'}</div>
          </div>
        ))}
      </div>
      <div className='pizza-other'>
        <p>Калории: {pizza.calories} ккал</p>
        <p>Белки: {pizza.protein}</p>
        <p>Жиры: {pizza.totalFat}</p>
        <p>Углеводы: {pizza.carbohydrates}</p>
        <p>Натрий: {pizza.sodium}</p>
        <p>Аллергены: {pizza.allergens.join(', ')}</p>
        <p>Вегетарианская: {pizza.isVegetarian ? 'Да' : 'Нет'}</p>
        <p>Без глютена: {pizza.isGlutenFree ? 'Да' : 'Нет'}</p>
        <p>Новинка: {pizza.isNew ? 'Да' : 'Нет'}</p>
        <p>Хит продаж: {pizza.isHit ? 'Да' : 'Нет'}</p>
      </div>
      <div className='total-price'>
        <p>Итоговая цена: {calculateTotalPrice()} р</p>
      </div>
    </Modal>
  );
};

export default PizzaCatalog;