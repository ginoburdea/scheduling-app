import inquirer from 'inquirer'
import { resolve, basename } from 'path'
import { parse } from 'dotenv'
import { readFileSync, writeFileSync } from 'fs'

const bootstrap = async () => {
    const pathToExampleEnvFile = resolve('.env.example')
    const defaultValues = parse(readFileSync(pathToExampleEnvFile))

    console.clear()
    console.log(
        `Configuring environment variables for ${basename(process.cwd())}...`
    )
    const answers = await inquirer.prompt(
        Object.keys(defaultValues).map(key => ({
            type: 'input',
            name: key,
            message: key,
            default: '' + defaultValues[key],
        }))
    )

    const envFileContent = Object.keys(answers).reduce(
        (fileContent, key) => `${fileContent}${key}="${answers[key]}"\n`,
        ''
    )

    const pathToEnvFile = resolve('.env')
    console.clear()
    console.log(`The following will be written to ${pathToEnvFile}\n`)

    console.log(envFileContent)

    const confirmation = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'shouldContinue',
            message: 'Do you want to continue?',
        },
    ])

    if (confirmation.shouldContinue) {
        writeFileSync(pathToEnvFile, envFileContent)
        console.clear()
        console.log('Created .env file')
    } else {
        console.clear()
        console.log('Aborted')
    }
}
bootstrap()
