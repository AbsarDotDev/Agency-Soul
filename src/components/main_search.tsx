import { Search } from 'lucide-react';
import React from 'react';

import { Input } from "@/components/ui/input"
import { Button } from './ui/button';

export function InputDemo() {
  return 
}


const MainSearch = () => {
  return (
    <div className='flex '>
     <Button variant="default" size="icon" className='bg-transparent text-primary hover:bg-transparent'>
      <Search className="h-5 w-5 " />
    </Button>
        <Input type="text" placeholder="Type to search..." className='rounded rounded-3xl bg-transparent ring-transparent border-transparent'/>
        
    </div>
  );
};

export default MainSearch;