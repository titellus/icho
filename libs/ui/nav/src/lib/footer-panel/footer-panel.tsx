import './footer-panel.module.scss';
import { Container, Grid, Header, List, Segment } from "semantic-ui-react";
import React from "react";

/* eslint-disable-next-line */
export interface FooterPanelProps {}

export function FooterPanel(props: FooterPanelProps) {
  return (
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'>Sitemap</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Statistics' />
              <List link inverted>
                <List.Item as='a'>INSPIRE</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted content='News'>
              </Header>
              <p>
                <List>
                  <List.Item>Maintenance planned on the 13th.</List.Item>
                </List>
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
}

export default FooterPanel;
