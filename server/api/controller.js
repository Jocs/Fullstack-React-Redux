import fs from 'fs'
import path from 'path'

const filePath = path.join(__dirname, 'products.json')

export const getProducts = () => {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, 'utf-8', (err, products) => {
			if (err) reject(err)
			else resolve(products)
		})
	})
}

export const setProducts = products => {
	fs.writeFile(filePath, products, 'utf-8', err => { if (err) console.log(err) })
}

