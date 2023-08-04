import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Modal, ListGroup, Alert } from 'react-bootstrap';
import axios from 'axios';

const FavoritesPage = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    // Fetch favorite recipes from local storage on component mount
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoriteRecipes(favorites);
  }, []);

  const handleRemoveFromFavorites = (recipeId) => {
    // Remove the recipe from favorites
    const updatedFavorites = favoriteRecipes.filter((recipe) => recipe.id !== recipeId);

    // Update local storage with the new favorites
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    // Update state to re-render the component and show alert
    setFavoriteRecipes(updatedFavorites);
    setShowAlert(true);

    // Hide the alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleViewRecipe = async (recipe) => {
    try {
      const apiKey = 'e766638900d54da581f0399b1ce3c77c';
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`
      );
      setSelectedRecipe(response.data);
      setShowViewModal(true);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  const handleShareOnSocialMedia = (platform) => {
    const title = selectedRecipe.title;
    const url = selectedRecipe.sourceUrl;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
          '_blank'
        );
        break;
      case 'pinterest':
        window.open(
          `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
            url
          )}&media=${encodeURIComponent(selectedRecipe.image)}&description=${encodeURIComponent(title)}`,
          '_blank'
        );
        break;
      // Add more cases for other social media platforms if needed
      default:
        break;
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Favorite Recipes</h1>
      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          Recipe deleted from favorites!
        </Alert>
      )}
      <div className="row">
        {favoriteRecipes.map((recipe) => (
          <div key={recipe.id} className="col-md-4 mb-4">
            <Card style={{ width: '100%' }}>
              <Card.Img variant="top" src={recipe.image} />
              <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
                <div className="d-grid gap-2">
                  <Button variant="primary" onClick={() => handleViewRecipe(recipe)}>
                    View Recipe
                  </Button>
                  <Button variant="info" onClick={() => setShowShareModal(true)}>
                    Share
                  </Button>
                  <Button variant="danger" onClick={() => handleRemoveFromFavorites(recipe.id)}>
                    Remove
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
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
              <Button variant="secondary" onClick={() => setShowViewModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
      <Modal show={showShareModal} onHide={() => setShowShareModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Share Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            variant="outline-secondary"
            onClick={() => handleShareOnSocialMedia('facebook')}
            className="mb-3"
            style={{ width: '100%' }}
          >
            Share on Facebook
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => handleShareOnSocialMedia('twitter')}
            className="mb-3"
            style={{ width: '100%' }}
          >
            Share on Twitter
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => handleShareOnSocialMedia('pinterest')}
            style={{ width: '100%' }}
          >
            Share on Pinterest
          </Button>
          {/* Add more social media share buttons here */}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default FavoritesPage;
