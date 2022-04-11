import { Admin as RaAdmin, Resource } from 'react-admin'

import { dataProvider } from './dataProvider'

export const Admin = () => (
    <RaAdmin dataProvider={dataProvider}>
        <Resource name="posts" />
    </RaAdmin>
)
