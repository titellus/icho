import styles from './metadata-result.module.scss';
import React, {useState} from "react";
import {ReactiveBase, ReactiveList} from "@appbaseio/reactivesearch";
import {Label, Button, Icon, Card, List, Grid, Image, Header, Container} from 'semantic-ui-react'
import {AssociatedResources} from "../associated-resources/associated-resources";
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
      url={api + '/api/search/'}
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
          // @ts-ignore
          return (
            <div className={styles.mtdResult}>
              <Container fluid>
                {data.map((res: any) => (
                  <Grid divided='vertically' key={res.uuid}>
                    <Grid.Row columns={2}>
                      <Grid.Column width={12}>
                        <Header as='h2'>{res.resourceTitleObject?.default}</Header>
                        <p>
                          {res.resourceAbstractObject?.default}
                        </p>
                        <AssociatedResources id={res.id || ''} types='onlines'/>
                        <AssociatedResources id={res.id || ''} types='parent,children,brothersAndSisters,services,datasets'/>
                        <AssociatedResources id={res.id || ''} types='fcats,related'/>
                        <AssociatedResources id={res.id || ''} types='sources'/>
                        <AssociatedResources id={res.id || ''} types='hassources'/>
                      </Grid.Column>
                      <Grid.Column width={4}>
                        <Image src={
                          res.overview && res.overview.length > 0
                            ? res.overview[0].url
                            : "https://react.semantic-ui.com/images/wireframe/image.png"
                        }/>
                        <MetadataTimeLine timeValue={res.resourceDate || ''}/>
                        {res.resourceTemporalExtentDetails ? (
                          <React.Fragment>
                            {res.resourceTemporalExtentDetails.map((element: any, index:number) => (
                              <List key={index}>
                                <List.Item>
                                  <List.Content>
                                    <List.Header>ResourceTemporalExtent</List.Header>
                                    <Button as='div' labelPosition='left' style={{cursor : 'default'}}>
                                      <Label basic color='blue' pointing='right'>
                                        <Icon name='flag outline' />
                                        {element.start.date}
                                      </Label>
                                      <Button as='div' color='blue' style={{cursor : 'default'}}>
                                        <Icon name='flag checkered' />
                                        {element.end.date}
                                      </Button>
                                    </Button>
                                  </List.Content>
                                </List.Item>
                              </List>
                            ))}
                          </React.Fragment>
                        ):('')}
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
                                {res.contactForResource.map((element: any, index:number) => (
                                  <Card key={index}>
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
                                <Label key={element}>
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
                          {res.contact.map((element: any, index:number) => (
                            <Card key={index}>
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
                        <MetadataUniqueElementList title='MetadataIdentifier' value={res.metadataIdentifier || ''}/>
                        <MetadataUniqueElementList title='MainLanguage' value={res.mainLanguage || ''}/>
                        <MetadataUniqueElementList title='dateStamp' value={res.dateStamp || ''}/>
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
