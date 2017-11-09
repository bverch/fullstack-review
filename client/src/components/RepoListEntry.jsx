import React from 'react';

const RepoListEntry = (props) => (
  <div>
    <h4> Repo List Component </h4>
    <p>{'Username: ' + props.repo.username}</p><a href={props.repo.url}>{props.repo.name}{'  forks={ ' + props.repo.forks + '}'}</a>
    <p>{props.repo.description}</p>
  </div>
)

export default RepoListEntry;