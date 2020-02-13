import React from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default function GroupPicker({
    groups,
    ...props
  })

  {
    return (
    <FormGroup controlId="group">
        <ControlLabel>Group</ControlLabel>
        <FormControl componentClass="select">
            {groups.map((group) => <option key={group.groupId} value={group.groupId}>{group.groupName}</option>)}
        </FormControl>
    </FormGroup>
  );
}