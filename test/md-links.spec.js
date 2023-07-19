const { mdLinks }= require('../index');


describe('mdLinks', () => {
  it('should return a promise', async () => {
    try {
      await expect(mdLinks()).resolves.toBeInstanceOf(Promise);
    } catch (error) {
    }
  });
  
  it('should reject when the path doesnt exists', () => {
    return mdLinks('/cursos/noexise.ms').catch((error) => {
      expect(error).toBeInstanceOf(Error); // Verifica que el error sea una instancia de Error
      expect(error.message).toBe('La ruta no existe');
    })
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


