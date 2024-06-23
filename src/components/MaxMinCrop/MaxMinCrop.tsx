import React from "react"
import { Table } from "@mantine/core"
import data from "../../data/Manufac _ India Agro Dataset.json"
import style from "./MaxMinCrop.module.css"

interface CropEntry {
  crop: string
  production: number
}

interface YearData {
  [key: string]: CropEntry[]
}

interface MaxMinResult {
  year: number
  MaxProduction: string
  MinProduction: string
}

const MaxMinCrop: React.FC = () => {
  function extractMaxMinProduction(data: any[]): MaxMinResult[] {
    const yearData: YearData = {}

    // make object with year as keys and array of objects are values
    data.forEach((entry) => {
      const year = entry.Year.match(/\d{4}/)[0] // Extract year from the string
      const production = parseFloat(entry["Crop Production (UOM:t(Tonnes))"])

      if (!yearData[year]) {
        yearData[year] = []
      }

      if (!isNaN(production)) {
        yearData[year].push({ crop: entry["Crop Name"], production })
      }
    })

    // console.log(yearData)

    // Calculate max and min production for each year
    const result: MaxMinResult[] = []

    for (const year in yearData) {
      const crops = yearData[year]

      if (crops.length > 0) {
        const maxProductionCrop = crops.reduce(
          (max, crop) => (crop.production > max.production ? crop : max),
          crops[0]
        )
        const minProductionCrop = crops.reduce(
          (min, crop) => (crop.production < min.production ? crop : min),
          crops[0]
        )

        result.push({
          year: parseInt(year),
          MaxProduction: maxProductionCrop.crop,
          MinProduction: minProductionCrop.crop
        })
      }
    }
    // console.log(result)

    return result
  }

  const extractedData = extractMaxMinProduction(data)

  const rows = extractedData.map((element) => (
    <Table.Tr key={element.year}>
      <Table.Td>{element.year}</Table.Td>
      <Table.Td>{element.MaxProduction}</Table.Td>
      <Table.Td>{element.MinProduction}</Table.Td>
    </Table.Tr>
  ))

  return (
    <Table
      striped
      highlightOnHover
      withTableBorder
      withColumnBorders
      verticalSpacing="md"
      horizontalSpacing="xl"
      style={{ width: "80%" }}
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th className={style.heading}>Year</Table.Th>
          <Table.Th className={style.heading}>
            Crop with Maximum Production in that Year
          </Table.Th>
          <Table.Th className={style.heading}>
            Crop with Minimum Production in that Year
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody className={style.content}>{rows}</Table.Tbody>
    </Table>
  )
}

export default MaxMinCrop
