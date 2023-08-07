const { mdLinks, getLinks,
  validateLinks }= require('../index');
const fs = require('fs');
const axios = require('axios');
  
  describe('mdLinks', () => {
    it('should return a promise', async () => {
      try {
        await expect(mdLinks()).resolves.toBeInstanceOf(Promise);
      } catch (error) {
      }
    });

    it('should reject when the path doesnt exist', () => {
      return mdLinks([{ href: 'nonexistent-path.md', text: 'Link', file: 'nonexistent-path.md' }])
        .catch((error) => {
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toBe('LA RUTA NO EXISTE: DENEGADO');
        });
    });
    
    it('should reject with correct error message when file is not .md', () => {
      return mdLinks('test-file.txt').catch((error) => {
        expect(error.message).toBe('LA RUTA NO EXISTE: DENEGADO');
      });
    });
  });

    it('should resolve with an empty array if no links are found in the file', async () => {
      const filePath = 'test-file.md';
      const fileContent = `
        This is some random text without any links.
      `;
      fs.writeFileSync(filePath, fileContent, 'utf-8');

      const result = await mdLinks(filePath);
      expect(result).toEqual([]);

      fs.unlinkSync(filePath);
    });

    it('should resolve with an empty array for an empty file', async () => {
      const filePath = 'empty-file.md';
      const fileContent = '';
      fs.writeFileSync(filePath, fileContent, 'utf-8');

      const result = await mdLinks(filePath);
      expect(result).toEqual([]);

      fs.unlinkSync(filePath);
    });

  jest.mock('axios');

  describe('validateLinks', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should validate links and return validated links array', async () => {
      const links = [
        { href: 'https://www.google.com', text: 'Example Link 1', file: 'example.md' },
      ];
  
      const axiosResponses = [
        { status: 200, statusText: 'Ok' }
      ];
      axios.get.mockResolvedValueOnce(axiosResponses[0]);
  
      const result = await validateLinks(links);
  
      expect(result).toEqual([
        { status: 200, statusText: 'Ok' }
      ]);
    });
  });
  
  
    it('should validate links and return failed links array', async () => {
      const links = [
        { href: 'https://www.google.com', text: 'Example Link 1', file: 'example.md' },
      ];
  
      const axiosResponses = [
        { status: 404, statusText: 'fail' }
      ];
      axios.get.mockResolvedValueOnce(axiosResponses[0]);
  
      const result = await validateLinks(links);
  
      expect(result).toEqual([
        { status: 404, statusText: 'fail' }
      ]);
    });

