import Logo from '../cpp-octo-web.svg'

function SideNav() {
    return (
      <div class="sidenav">
        <img src={Logo} alt="logo"/>
        <h1><a href={null}>Home</a></h1>
        <h1><a href={null}>Blog</a></h1>
        <button type="button">Logout</button>
      </div>
    );
}

export default SideNav