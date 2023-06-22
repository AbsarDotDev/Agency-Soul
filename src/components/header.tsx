import React from 'react';
import { Button } from "@/components/ui/button"
import { ModeToggle } from './toogleDarkMode';
import MainSearch from './main_search';

const Header = () => {
  return (
    <div className='flex justify-between bg-primary-foreground py-5 px-5'>
    <div className='search-main'>
      <MainSearch></MainSearch>
    </div>
      
    <div className='header-right'>
     <ModeToggle/>
    </div>

    </div>
  );
};

export default Header;