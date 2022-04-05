function Footer() {
  const footerYear = new Date().getFullYear()

  return (
    <footer className='footer text-primary-content footer-center'>
      <div>

        <p>{footerYear} - Nicolas Hennebert</p>
      </div>
    </footer>
  )
}

export default Footer