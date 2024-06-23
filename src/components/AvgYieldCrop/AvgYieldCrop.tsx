import React from "react"
import { Table } from "@mantine/core"
import data from "../../data/Manufac _ India Agro Dataset.json"
import style from "./AvgYieldCrop.module.css"

interface CropData {
  totalYield: number
  totalArea: number
  countYield: number
  countArea: number
}

interface CropResult {
  crop: string
  "Average Yield": number
  "Average Cultivation Area": number
}

const AvgYieldCrop: React.FC = () => {
  function calculateAverages(data: any[]): CropResult[] {
    const cropData: { [key: string]: CropData } = {}

    // Collect data by crop
    data.forEach((info) => {
      const year = parseInt(info.Year.match(/\d{4}/)[0])
      if (year >= 1950 && year <= 2020) {
        const crop = info["Crop Name"]
        const yieldVal = parseFloat(
          info["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]
        )
        const area = parseFloat(
          info["Area Under Cultivation (UOM:Ha(Hectares))"]
        )

        if (!cropData[crop]) {
          cropData[crop] = {
            totalYield: 0,
            totalArea: 0,
            countYield: 0,
            countArea: 0
          }
        }

        if (!isNaN(yieldVal)) {
          cropData[crop].totalYield += yieldVal
          cropData[crop].countYield += 1
        }

        if (!isNaN(area)) {
          cropData[crop].totalArea += area
          cropData[crop].countArea += 1
        }
      }
    })
    // console.log(cropData)

    // Calculate the averages
    const result: CropResult[] = Object.keys(cropData).map((crop) => {
      const totalYield = cropData[crop].totalYield
      const totalArea = cropData[crop].totalArea
      const countYield = cropData[crop].countYield
      const countArea = cropData[crop].countArea

      const averageYield =
        countYield > 0 ? parseFloat((totalYield / countYield).toFixed(3)) : 0
      const averageArea =
        countArea > 0 ? parseFloat((totalArea / countArea).toFixed(3)) : 0

      return {
        crop: crop,
        "Average Yield": averageYield,
        "Average Cultivation Area": averageArea
      }
    })

    return result
  }

  const extractedData = calculateAverages(data)

  //created rows of the table
  const rows = extractedData.map((element) => (
    <Table.Tr key={element.crop}>
      <Table.Td>{element.crop}</Table.Td>
      <Table.Td>{element["Average Yield"]}</Table.Td>
      <Table.Td>{element["Average Cultivation Area"]}</Table.Td>
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
          <Table.Th className={style.heading}>Crop </Table.Th>
          <Table.Th className={style.heading}>
            Average Yield of the Crop between 1950-2020 (in Kg/Ha)
          </Table.Th>
          <Table.Th className={style.heading}>
            Average Cultivation Area of the Crop between 1950-2020 (in Ha)
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody className={style.content}>{rows}</Table.Tbody>
    </Table>
  )
}

export default AvgYieldCrop
