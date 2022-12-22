import AvgDTO from "../domain/dtos/avg.dto";

const map_avg= (input: any): AvgDTO => {
    return {
        symbol : input.symbol,
        amount : input[1],
        price : input[0]
    }
}

export default map_avg;