if (document.querySelector('.copy')) {
  const copy = document.querySelector('.copy')

  copy.addEventListener('click', () => {
    const copyShortenURL = document.querySelector('.copyShortenURL')
    copyShortenURL.select();
    document.execCommand('copy');
  })
}
  
