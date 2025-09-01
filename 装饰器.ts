// @ts-nocheck
// 装饰器的类型
// 1. 类装饰器（Class Decorators）
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}

// 2. 方法装饰器（Method Decorators）
function log(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  
  descriptor.value = function (...args: any[]) {
    console.log(`调用方法 ${propertyName}，参数:`, args);
    const result = method.apply(this, args);
    console.log(`方法 ${propertyName} 返回:`, result);
    return result;
  };
}

class Calculator {
  @log
  add(a: number, b: number) {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(2, 3); // 会打印日志信息

// 3. 属性装饰器（Property Decorators
function readonly(target: any, propertyName: string) {
  Object.defineProperty(target, propertyName, {
    writable: false
  });
}

class Person {
  @readonly
  name: string = "张三";
}

const person = new Person();
// person.name = "李四"; // 错误：无法修改只读属性

// 4. 参数装饰器（Parameter Decorators）
function required(target: any, propertyName: string, parameterIndex: number) {
  console.log(`参数 ${parameterIndex} 在方法 ${propertyName} 中是必需的`);
}

class User {
  login(@required username: string, @required password: string) {
    // 登录逻辑
  }
}


// 应用
// 1. 依赖注入
function Injectable(target: any) {
  // 标记类可以被注入
  target.injectable = true;
}

@Injectable
class UserService {
  getUsers() {
    return ['用户1', '用户2'];
  }
}
// 2. 验证装饰器
function validate(validator: (value: any) => boolean) {
  return function (target: any, propertyName: string) {
    let value = target[propertyName];
    
    Object.defineProperty(target, propertyName, {
      get: () => value,
      set: (newValue) => {
        if (!validator(newValue)) {
          throw new Error(`${propertyName} 验证失败`);
        }
        value = newValue;
      }
    });
  };
}

class User {
  @validate(email => email.includes('@'))
  email: string;
}
// 3. 性能监控
function measure(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function (...args: any[]) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const end = performance.now();
    console.log(`${propertyName} 执行时间: ${end - start}ms`);
    return result;
  };
}

class DataProcessor {
  @measure
  processLargeDataset(data: any[]) {
    // 处理大量数据
    return data.map(item => item * 2);
  }
}

