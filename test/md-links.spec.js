const { mdLinks, validateLinks }= require('../index');
const axios = require('axios');

const links =   [{
  href: 'https://www.google.com',
  text: 'Google - MDN',    
  file: 'C:\\xampp\\htdocs\\laboratoria\\md_links\\DEV007-md-links\\Testing\\testing.md'  }];

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
  
  it('should reject with correct error message', () => {
    return mdLinks(links).catch((error) => {
      expect(error.message).toBe('LA RUTA NO EXISTE: DENEGADO');
    });
  });
});

const path = require('path');

describe('isAbsolute', () => {
  it('should return true for absolute paths', () => {
    const absolutePaths = [
      '/path/to/file.txt',
      '/another/path/to/folder',
      '/absolute/path/without/file',
    ];
    absolutePaths.forEach((absolutePath) => {
      expect(path.isAbsolute(absolutePath)).toBe(true);
    });
  });

  it('should return false for relative paths', () => {
    const relativePaths = [
      './relative/path/to/file.txt',
      '../another/relative/path',
      'file.js',
    ];
    relativePaths.forEach((relativePath) => {
      expect(path.isAbsolute(relativePath)).toBe(false);
    });
  });
});

jest.mock('axios'); 

describe('validateLinks', () => {
  it('should return an array of validated links', async () => {
    const links = [
      { href: 'https://www.google.com', text: 'Example Link 1', file: 'example.md' },
      { href: 'https://www.pixar.com/error404', text: 'Example Link 2', file: 'example.md' },
    ];

    const axiosResponses = [
      { status: 200, response: { statusText: 'OK' } },
      { response: { status: 404, statusText: 'fail' } }
    ];

    axios.get.mockResolvedValueOnce(axiosResponses[0]);
    axios.get.mockRejectedValueOnce(axiosResponses[1]);

    const result = await validateLinks(links);

    expect(result).toEqual([
      { status: 200, statusText: 'ok' },
      { status: 404, statusText: 'fail' },
    ]);
  });
});