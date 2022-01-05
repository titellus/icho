import styles from './metadata-result.module.scss';
import React, {useState} from "react";
import {ReactiveBase, ReactiveList} from "@appbaseio/reactivesearch";
import {Label, Card, List, Grid, Image, Header, Container} from 'semantic-ui-react'
import {MetadataLinksFamily} from "../metadata-links-family/metadata-links-family";
import MetadataUniqueElementList from "../metadata-unique-element-list/metadata-unique-element-list";
import MetadataList from "../metadata-list/metadata-list";
import MetadataTimeLine from "../metadata-time-line/metadata-time-line";

/* eslint-disable-next-line */
export interface MetadataResultProps {
}

interface Props {
  uuid: string;
}

export function MetadataResult({uuid}: Props) {
  let default_query = {
    query_string: {query: uuid, fields: ["_id", "uuid"]},
  };
  const api = process.env.NX_CATALOGUE_API_ENDPOINT;
  return (
    <ReactiveBase
      app="records"
      url={api + '/srv/api/search/'}
      enableAppbase={false}
    >
      <ReactiveList
        componentId="mtd"
        pagination={false}
        showResultStats={false}
        defaultQuery={() => ({
          query: default_query,
        })}
        dataField={'_id'}
        react={{}}
        render={({loading, error, data}) => {
          if (loading) {
            return <div>Fetching Results.</div>;
          }
          if (error) {
            return (
              <div>
                Something went wrong! Error details{" "}
                {JSON.stringify(error)}
              </div>
            );
          }
          return (
            <div className={styles.mtdResult}>
              <Container fluid>
                {data.map((res: any) => (
                  <Grid divided='vertically'>
                    <Grid.Row columns={2}>
                      <Grid.Column width={12}>
                        <Header as='h2'>{res.resourceTitleObject?.default}</Header>
                        <p>
                          {res.resourceAbstractObject?.default}
                        </p>
                        <MetadataLinksFamily id={res.id || ''} types='onlines'/>
                        <MetadataLinksFamily id={res.id || ''} types='parent,children,brothersAndSisters,services,datasets'/>
                        <MetadataLinksFamily id={res.id || ''} types='fcats,related'/>
                        <MetadataLinksFamily id={res.id || ''} types='sources'/>
                        <MetadataLinksFamily id={res.id || ''} types='hassources'/>
                      </Grid.Column>
                      <Grid.Column width={4}>
                        <Image src={
                          res.overview && res.overview.length > 0
                            ? res.overview[0].url
                            : "https://react.semantic-ui.com/images/wireframe/image.png"
                        }/>
                        <MetadataTimeLine timeValue={res.resourceDate || ''}/>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={3}>
                      <Grid.Column>
                        <MetadataList title='Theme' value={res["th_otherKeywords-theme"] || ''} field='default'/>
                        <MetadataList title='GEMETTheme' value={res["th_gemet-theme"] || ''} field='default'/>
                        <MetadataList title='GEMET' value={res.th_gemet || ''} field='default'/>
                        <MetadataList title='InfraSIG' value={res.th_infraSIG || ''} field='default'/>
                        <MetadataList title='Geoportal' value={res.th_Themes_geoportail_wallon_hierarchy || ''}
                                      field='default'/>
                      </Grid.Column>
                      <Grid.Column>
                        <MetadataList title='ResourceLanguage' value={res.resourceLanguage || ''} field=''/>
                        <MetadataList title='ResourceIdentifier' value={res.resourceIdentifier || ''} field='code'/>
                        <MetadataList title='LegalConstraints'
                                      value={res.MD_LegalConstraintsOtherConstraintsObject || ''} field='default'/>
                        <List>
                          <List.Item>
                            <List.Content>
                              <List.Header>ResourceContact</List.Header>
                              <Card.Group itemsPerRow={1}>
                                {res.contactForResource.map((element: any) => (
                                  <Card>
                                    <Card.Content>
                                      <Card.Header>{element.organisation}</Card.Header>
                                      <Card.Meta>{element.role}</Card.Meta>
                                      <Card.Description>
                                        {element.email}
                                      </Card.Description>
                                    </Card.Content>
                                  </Card>
                                ))}
                              </Card.Group>
                            </List.Content>
                          </List.Item>
                        </List>
                        <MetadataList title='CrsDetails' value={res.crsDetails || ''} field='name'/>
                        <List>
                          <List.Item>
                            <List.Content>
                              <List.Header>Format</List.Header>
                              {res.format.map((element: any) => (
                                <Label>
                                  {element}
                                </Label>
                              ))}
                              <br/>
                            </List.Content>
                          </List.Item>
                        </List>
                        <MetadataList title='resolutionScaleDenominator' value={res.resolutionScaleDenominator || ''}
                                      field=''/>
                        <MetadataList title='RepresentationType' value={res.cl_spatialRepresentationType || ''}
                                      field='default'/>
                        <MetadataList title='UpdateFrequency' value={res.cl_maintenanceAndUpdateFrequency || ''}
                                      field='default'/>
                      </Grid.Column>
                      <Grid.Column>
                        <MetadataUniqueElementList title='Lineage' value={res.lineageObject?.default || ''}/>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                      <Grid.Column width={16}>
                        <Header as='h3'>Metadata information</Header>
                        <Card.Group>
                          {res.contact.map((element: any) => (
                            <Card>
                              <Card.Content>
                                <Card.Header>{element.organisation}</Card.Header>
                                <Card.Meta>{element.role}</Card.Meta>
                                <Card.Description>
                                  {element.email}
                                </Card.Description>
                              </Card.Content>
                            </Card>
                          ))}
                        </Card.Group>
                        <List>
                          <List.Item>
                            <List.Content>
                              <List.Header>ResourceContact</List.Header>
                              {res.metadataIdentifier}
                            </List.Content>
                          </List.Item>
                        </List>
                        <List>
                          <List.Item>
                            <List.Content>
                              <List.Header>ResourceContact</List.Header>
                              {res.mainLanguage}
                            </List.Content>
                          </List.Item>
                        </List>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                ))}
              </Container>
            </div>
          );
        }}
      />
    </ReactiveBase>
  );
}

export default MetadataResult;
