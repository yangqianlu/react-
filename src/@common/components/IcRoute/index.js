import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';

// export default function IcRoute({ title, ...rest }) {
//   const docTitle = document.title;

//   if (title && docTitle !== title) {
//     document.title = 'e成科技AI咨询-' + title;
//   }

//   return <Route {...rest} />;
// }


function IcRoute({ title, ...rest }) {
  useEffect(() => {
    document.title = (title)
  }, [title])
  return <Route {...rest} />
}
export default IcRoute
