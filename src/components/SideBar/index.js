/* eslint-disable react/display-name, jsx-a11y/click-events-have-key-events */
import { Navigation } from "react-minimal-side-navigation";
import { useNavigate } from "react-router-dom";
import Icon from "awesome-react-icons";
import React, { useState } from "react";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { Spacer, Text } from "@nextui-org/react";

export const NavSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  return (
    <React.Fragment >

      <div style={{ width: '250px' }} className={
        isSidebarOpen ? "block" : "hidden"
      }>
        <Text h1
          size={40}
          color="primary"
          weight="bold" gap={4} >Admin</Text>
        <Spacer y={2} />
        <Navigation
          // you can use your own router's api to get pathname
          activeItemId="/dashboard"
          onSelect={({ itemId }) => {
            navigate(itemId);
          }}
          items={[
            {
              title: 'Dashboard',
              itemId: '/dashboard',
              elemBefore: () => <Icon name="star" />,
            },
            {
              title: 'Course',
              itemId: '/course',
              elemBefore: () => <Icon name="inbox" />,
              subNav: [
                {
                  title: 'New Courses',
                  itemId: '/course/new',
                },
              ],
            },
            {
              title: 'Users',
              itemId: '/users',
              elemBefore: () => <Icon name="user" />,
              subNav: [
                {
                  title: 'Users',
                  itemId: '/users',
                },
              ],
            },
          ]}
        />
      </div>


      <div style={{backgroundColor:"#777777"}}>
        <button
          className="btn-menu "
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          type="button"
        >
          <Icon name="burger" className="w-6 h-6" />
        </button>

      </div>
    </React.Fragment>
  );
};
