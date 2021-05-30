import React from 'react'
import { Dropdown, Divider, Input, Menu, Button, Header } from 'semantic-ui-react'
import styled from 'styled-components'

import _ from 'lodash'

const Styles = styled.div`
  
`

export function SidebarExplore({ values, setValues }) {
    const addressDefinitions =
    {
        state: [
            { "id": 11, "nama": "Aceh" }, { "id": 12, "nama": "Sumatera Utara" }, { "id": 13, "nama": "Sumatera Barat" }, { "id": 14, "nama": "Riau" }, { "id": 15, "nama": "Jambi" }, { "id": 16, "nama": "Sumatera Selatan" }, { "id": 17, "nama": "Bengkulu" }, { "id": 18, "nama": "Lampung" }, { "id": 19, "nama": "Kepulauan Bangka Belitung" }, { "id": 21, "nama": "Kepulauan Riau" }, { "id": 31, "nama": "Dki Jakarta" }, { "id": 32, "nama": "Jawa Barat" }, { "id": 33, "nama": "Jawa Tengah" }, { "id": 34, "nama": "Di Yogyakarta" }, { "id": 35, "nama": "Jawa Timur" }, { "id": 36, "nama": "Banten" }, { "id": 51, "nama": "Bali" }, { "id": 52, "nama": "Nusa Tenggara Barat" }, { "id": 53, "nama": "Nusa Tenggara Timur" }, { "id": 61, "nama": "Kalimantan Barat" }, { "id": 62, "nama": "Kalimantan Tengah" }, { "id": 63, "nama": "Kalimantan Selatan" }, { "id": 64, "nama": "Kalimantan Timur" }, { "id": 65, "nama": "Kalimantan Utara" }, { "id": 71, "nama": "Sulawesi Utara" }, { "id": 72, "nama": "Sulawesi Tengah" }, { "id": 73, "nama": "Sulawesi Selatan" }, { "id": 74, "nama": "Sulawesi Tenggara" }, { "id": 75, "nama": "Gorontalo" }, { "id": 76, "nama": "Sulawesi Barat" }, { "id": 81, "nama": "Maluku" }, { "id": 82, "nama": "Maluku Utara" }, { "id": 91, "nama": "Papua Barat" }, { "id": 94, "nama": "Papua" }
        ]
    }

    const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
        key: state.id,
        text: state.nama,
        value: state.nama,
    }))


    const filterOptions = [
        {
            key: 0,
            text: 'Most recent',
            value: 'recent',
        },
        {
            key: 1,
            text: 'Most members',
            value: 'member',
        }
    ]

    const onChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onChangeDropdown = (e, data) => {
        setValues({ ...values, [data.name]: data.value })
    }

    function onClear() {
        setValues({
            filterField: '',
            locationField: '',
            sortField: ''
        })
    }

    return (
        <Styles>
            <Menu vertical>
                <Menu.Item>
                    <Header>Search</Header>
                    <Input
                        name='filterField'
                        icon='search'
                        placeholder='Keyword or name'
                        value={values.filterField}
                        onChange={e => onChange(e)}
                    />
                </Menu.Item>

                <Divider />

                <Menu.Item>
                    <Header>Location</Header>
                    <Dropdown
                        name='locationField'
                        placeholder='Location'
                        fluid
                        clearable
                        search
                        selection
                        options={stateOptions}
                        onChange={onChangeDropdown}
                    />
                </Menu.Item>

                <Menu.Item>
                    <Header>Sort by</Header>
                    <Dropdown
                        name='sortField'
                        selection
                        fluid
                        options={filterOptions}
                        defaultValue={filterOptions[0].value}
                        onChange={onChangeDropdown}
                    />
                </Menu.Item>

                <Menu.Item>
                    <Button secondary primary fluid type="button"
                        onClick={onClear}
                    >
                        Clear (show all)
                    </Button>
                </Menu.Item>
            </Menu>
        </Styles>
    )
}