import { retrieveSensorsData } from '../path-to-your-retrieveSensorsData-file';
import { isInTestEnv } from '../env/index.js';
import { data } from '../../../data/mock-homepage-data.js';

// Mock la fonction isInTestEnv pour contrôler l'environnement de test
jest.mock('../env/index.js', () => ({
  isInTestEnv: jest.fn()
}));

describe('retrieveSensorsData', () => {
  beforeEach(() => {
    jest.resetAllMocks(); // Réinitialise les mocks avant chaque test
  });

  test('should return mock facades data when in test environment', () => {
    isInTestEnv.mockReturnValue(true); // Configure le mock pour retourner true

    // Appelle la fonction et vérifie le résultat
    const result = retrieveSensorsData();
    expect(result).toBe(data.facades);
  });

  test('should fetch real data and return facades when not in test environment', async () => {
    isInTestEnv.mockReturnValue(false); // Configure le mock pour retourner false

    // Mock la méthode fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ facades: 'real data' })
      })
    );

    // Appelle la fonction et vérifie le résultat
    const result = await retrieveSensorsData();
    expect(result).toBe('real data');

    // Vérifie que fetch a été appelé avec la bonne URL
    expect(fetch).toHaveBeenCalledWith('http://localhost:5500/data/homepage-data.json');
  });

  test('should catch error and log to console when fetch fails', async () => {
    isInTestEnv.mockReturnValue(false); // Configure le mock pour retourner false

    // Mock la méthode fetch pour simuler une erreur
    global.fetch = jest.fn(() => Promise.reject(new Error('Fetch failed')));

    // Spy sur console.log pour vérifier qu'un message d'erreur est loggé
    console.log = jest.fn();

    // Appelle la fonction et vérifie le résultat
    const result = await retrieveSensorsData();
    expect(result).toBeUndefined(); // Assure-toi que la fonction ne retourne rien en cas d'erreur

    // Vérifie que console.log a été appelé avec le message d'erreur
    expect(console.log).toHaveBeenCalledWith("Oh no", expect.any(Error));
  });
});
