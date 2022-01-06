import styles from './associated-resources.module.scss';
import React from "react";
import {Message, List, Icon} from 'semantic-ui-react'
import {RecordsApi} from "@catalogue/api/geonetwork";

interface Props {
  id: string;
  types:string;
}

export function AssociatedResources({id, types}: Props) {
  const typesParameters2:Array<any> = types.split(',')
  const[relatedLinks, setRelatedLinks] = React.useState<any>(null)
  React.useEffect(()=> {
    new RecordsApi().getAssociatedResources(id, typesParameters2).then(res => {
      setRelatedLinks(res.data)
    });
  },[])
  if (!relatedLinks) return null
  const familyLinks = []
  for (const element in (Object.keys(relatedLinks).filter(key => relatedLinks[key] != null))) {
    let jsonLinks:any = {};
    let name = Object.keys(relatedLinks).filter(key => relatedLinks[key] != null)[element].toString()
    jsonLinks[name] = relatedLinks[Object.keys(relatedLinks).filter(key => relatedLinks[key] != null)[element]]
    familyLinks.push(jsonLinks)
  }
  return (
    <div>
      {familyLinks.map(familyLink => (
        <div>
          {Object.entries(familyLink).map((item: [string, any]) => {
            return(
              <React.Fragment>
                {item[0] != "thumbnails" ? (
                  <React.Fragment>
                    <Message info>
                      <Message.Header className={styles.linkTypesNames}>{item[0]}</Message.Header>
                        {item[1].map((parameters:any) => (
                          <React.Fragment>
                            <List>
                              <List.Item as='a' href={parameters.url[Object.keys(parameters.url)[0]]}>
                                {item[0] === "hassources" ? (
                                  <Icon name='sitemap' />
                                ):('')}
                                {item[0] === "services" ? (
                                  <Icon name='file' />
                                ):('')}
                                {item[0] === "parent" ? (
                                  <Icon name='sitemap' />
                                ):('')}
                                {item[0] === "siblings" ? (
                                  <Icon name='sign-out' />
                                ):('')}
                                {item[0] === "onlines" &&  parameters.protocol === "WWW:LINK"? (
                                  <Icon name='linkify' />
                                ):('')}
                                {item[0] === "onlines" &&  (parameters.protocol === "OGC:WMS" || parameters.protocol === "ESRI:REST")? (
                                  <Icon name='globe' />
                                ):('')}
                                {item[0] === "onlines" &&  parameters.protocol === null ? (
                                  <Icon name='question circle' />
                                ):('')}

                                <List.Content>
                                  <List.Header>{parameters.title[Object.keys(parameters.title)[0]]}</List.Header>
                                  {parameters.description ? (
                                  <List.Description>
                                    {parameters.description[Object.keys(parameters.description)[0]]}
                                  </List.Description>):('')}
                                </List.Content>
                              </List.Item>
                            </List>
                          </React.Fragment>
                          ))}
                    </Message>
                    <br/>
                  </React.Fragment>
                  ) : ('')}
              </React.Fragment>
            )
          })}
        </div>
      ))}
    </div>
  );
}

export default AssociatedResources;
