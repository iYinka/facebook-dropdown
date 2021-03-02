import React, { useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

import { ReactComponent as ArrowIcon } from './icons/arrow.svg'
import { ReactComponent as BellIcon } from './icons/bell.svg'
import { ReactComponent as BoltIcon } from './icons/bolt.svg'
import { ReactComponent as CaretIcon } from './icons/caret.svg'
import { ReactComponent as ChevronIcon } from './icons/chevron.svg'
import { ReactComponent as CogIcon } from './icons/cog.svg'
import { ReactComponent as MessengerIcon } from './icons/messenger.svg'
import { ReactComponent as PlusIcon } from './icons/plus.svg'



function App() {
  return (
    <NavBar>
      <NavItem icon={ <PlusIcon /> } />
      <NavItem icon={ <BellIcon /> } />
      <NavItem icon={ <MessengerIcon />} />

      <NavItem icon={<CaretIcon />} >
          <DropdownMenu />
      </NavItem>

    </NavBar>

  );



  function DropdownMenu() {

    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropRef = useRef(null)

    useEffect(() => {
      setMenuHeight(dropRef.current?.firstChild.offseHeight)
    }, [])


    function calcHeight(el) {
      const height = el.offseHeight;
      setMenuHeight(height);
    }

    function DropdownItem(props) {
      return (
        <a href='#' className='menu__item' onMouseOver={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
          <span className='icon__button'>{props.leftIcon}</span>
            {props.children}
          <span className='icon__right'>{props.rightIcon}</span>
        </a>
      )
    }

    return (
      <div className='dropdown' style={{ height: menuHeight }} ref={dropRef}>
        <CSSTransition
          in={activeMenu === 'main'}
          unmountOnExit
          timeout={500}
          classNames='menu-primary'
          onEnter={calcHeight}
        >
            <div className='menu'>
              <DropdownItem goToMenu='profile'> My Profile</DropdownItem>
              <DropdownItem leftIcon={<CogIcon />} rightIcon={<ChevronIcon />} goToMenu='settings'>Settings</DropdownItem>
            </div>
        </CSSTransition>


        <CSSTransition
          in={activeMenu === 'settings'}
          unmountOnExit
          timeout={500}
          classNames='menu-secondary'
          onEnter={calcHeight}
        >
            <div className='menu'>
              <DropdownItem leftIcon={<ArrowIcon />} goToMenu='main' ><h3>Learn</h3></DropdownItem>
                  <DropdownItem leftIcon={ <BoltIcon />}>Settings</DropdownItem>
                  <DropdownItem>Settings</DropdownItem>
                  <DropdownItem>Settings</DropdownItem>
                  <DropdownItem>Settings</DropdownItem>
                  <DropdownItem>Settings</DropdownItem>
                  <DropdownItem>Settings</DropdownItem>
            </div>
        </CSSTransition>

        <CSSTransition
          in={activeMenu === 'profile'}
          unmountOnExit
          timeout={500}
          classNames='menu-secondary'
          onEnter={calcHeight}
        >
            <div className='menu'>
              <DropdownItem leftIcon={<ArrowIcon />} goToMenu='main' ><h3>Learn</h3></DropdownItem>
                  <DropdownItem>Settings</DropdownItem>
                  <DropdownItem>Settings</DropdownItem>
                  <DropdownItem>Settings</DropdownItem>
            </div>
        </CSSTransition>

      </div>
    )

  }


  function NavBar(props) {
    return (
      <nav className='navbar'>
        <ul className='navbar__nav'> { props.children }</ul>
      </nav>
    )
  }
}

function NavItem(props) {
  const [open, setOpen] = useState(false);
  return (
    <li className='nav__item'>
      <a href="#" className='icon__button' onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
    )
  }

export default App;
