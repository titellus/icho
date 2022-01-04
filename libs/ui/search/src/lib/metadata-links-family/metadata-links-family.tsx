import styles from './metadata-links-family.module.scss';
import React from "react";
import axios from "axios";
import {Message, List, Icon} from 'semantic-ui-react'

export interface MetadataLinksFamilyProps {}

interface Props {
  id: string;
  types:string;
}

export function MetadataLinksFamily({id, types}: Props) {
  const api = process.env.NX_CATALOGUE_API_ENDPOINT;
  const typesParameters = 'type=' + types.replace(/[, ]+/g,'&type=')
  const[relatedLinks, setRelatedLinks] = React.useState<any>(null)
  React.useEffect(()=> {
    axios.get(api +'/srv/api/records/'+ id +'/related?'+ typesParameters).then((res) => {
      setRelatedLinks(res.data)
    })
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
                                {item[0] === "onlines" &&  parameters.protocol === "WWW:LINK"? (
                                  <Icon name='linkify' />
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

export default MetadataLinksFamily;
