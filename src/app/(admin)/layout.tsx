import SidebarWithHeader from '@/components/Sidebar';
import Header from '@/components/header';
import React from 'react';

const AdminLayout = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
  return (
    <>
       <Header />
            <SidebarWithHeader />
            <div className="p-4 sm:ml-64">
              <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
              {children}
              </div>
            </div>
    </>
  );
};

export default AdminLayout;