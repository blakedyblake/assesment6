import { Builder, Capabilities, By } from "selenium-webdriver"

const chromedriver = require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await driver.get('http://localhost:4000')
})

afterAll(async () => {
    await driver.quit()
})

test('I can start a game', async () => {

    let button = await (await driver).findElement(By.id('start-game'));
    await button.click();
    //await driver.sleep(3000)
    
});
let chosenArray = []; //keeps track of already selected sections

test('I can select a the left lower corner',async()=>{
    let randNum = 6//Math.floor(Math.random()*8);
    chosenArray.push(randNum)

    let tickTack = await(await driver).findElement(By.id(`cell-${randNum}`))
    await tickTack.click()
    expect(await tickTack.getText()).toEqual('X')
    await driver.sleep(1000)
});

test('computer can select',async()=>{
    
    let compResponse = false;
    for(let i = 0; i < 9; i++){
        if(await(await driver).findElement(By.id(`cell-${i}`)).getText() === "O"){
            compResponse = true;
            break;
        }
        
    }
    expect(compResponse).toBeTruthy();

    await driver.sleep(1000)
    
})
test('I can select the lower right corner', async ()=>{
    let randNum = 8;
    chosenArray.push(randNum)

    let tickTack = await(await driver).findElement(By.id(`cell-${randNum}`))
    await tickTack.click()
    expect(await tickTack.getText()).toEqual('X')
    await driver.sleep(1000)
})
test('X can win', async()=>{
    let randNum = 7//Math.floor(Math.random()*8);
    chosenArray.push(randNum)

    let tickTack = await(await driver).findElement(By.id(`cell-${randNum}`))
    await tickTack.click()
    expect(await tickTack.getText()).toEqual('X')
    await driver.sleep(1000)

    expect(await (await driver).findElement(By.xpath('/html/body/h1')).getText()).toEqual('X won')
})