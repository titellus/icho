import "semantic-ui-css/semantic.min.css";
import { AuthProvider } from "@catalogue/utils/shared";
import { Link, Outlet } from "react-router-dom";
import React, { useState } from "react";
import { Button, Container, Icon, Menu } from "semantic-ui-react";
import { FooterPanel, SidebarMenu } from "@catalogue/ui/nav";
import { AuthenticateMenu } from "@catalogue/ui/authenticate";

export function App() {
  const [sidebarVisible, setSitebarVisible] = useState(false);

  return (
    <AuthProvider>
      <Container fluid style={{ height: "100vh" }}>
        <SidebarMenu visible={sidebarVisible} setVisible={setSitebarVisible}>
          <Menu borderless stackable>
            <Container>
              <Menu.Item as={Button}
                         toggle icon
                         active={sidebarVisible}
                         color={"grey"}
                         onClick={() => setSitebarVisible(!sidebarVisible)}>
                <Icon name="bars" />
              </Menu.Item>

              <Menu.Item as={Link} to='/search'>
                Search
              </Menu.Item>

              <AuthenticateMenu/>
            </Container>
          </Menu>

          <main>
            <Outlet />
          </main>

          <FooterPanel />
        </SidebarMenu>
      </Container>
    </AuthProvider>
  );
}

export default App;
