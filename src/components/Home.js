import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Alert, Form, Modal, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const Home = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showAlert]);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const apiKey = 'e766638900d54da581f0399b1ce3c77c'; // Replace with your Spoonacular API key
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`
      );
      setRecipes(response.data.results);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleViewRecipe = async (recipe) => {
    try {
      const apiKey = 'e766638900d54da581f0399b1ce3c77c'; // Replace with your Spoonacular API key
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`
      );
      setSelectedRecipe(response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRecipe(null);
  };

  const handleAddToFavorites = (recipe) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(recipe);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setShowAlert(true);
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Welcome to Recipe Radar</h1>
      <Form onSubmit={handleSearch} className="d-flex justify-content-center">
        <Form.Group controlId="searchQuery" className="mr-2 mb-0" style={{ width: '80%', height: '50%' }}>
          <Form.Control
            type="text"
            placeholder="Enter ingredients or recipe name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ height: '100%' }}
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ height: '50%' }}>
          Search
        </Button>
      </Form>
      <div className="row mt-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="col-md-4 mb-4">
            <Card style={{ width: '100%' }}>
              <Card.Img variant="top" src={recipe.image} />
              <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
                <div className="d-grid gap-2">
                  <Button variant="primary" onClick={() => handleViewRecipe(recipe)}>
                    View Recipe
                  </Button>
                  <Button
                    variant="info"
                    className="ml-2"
                    onClick={() => {
                      handleAddToFavorites(recipe);
                    }}
                  >
                    Add to Favorites
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        {selectedRecipe && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedRecipe.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h6>Ingredients:</h6>
              <ListGroup>
                {selectedRecipe.extendedIngredients.map((ingredient) => (
                  <ListGroup.Item key={ingredient.id}>{ingredient.original}</ListGroup.Item>
                ))}
              </ListGroup>
              <h6 className="mt-3">Instructions:</h6>
              <ol>
                {selectedRecipe.analyzedInstructions[0].steps.map((step) => (
                  <li key={step.number}>{step.step}</li>
                ))}
              </ol>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
      {showAlert && (
        <Alert variant="success" className="fixed-top m-3">
          Added to Favorites!
        </Alert>
      )}
    </Container>
  );
};

export default Home;
