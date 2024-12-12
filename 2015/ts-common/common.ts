export function pairs<T>(items: T[]): T[][]  {
  const pairs: T[][] = []
  items.forEach((item, i) => {
    items.forEach((item2, i2) => {
      if (i != i2) {
        pairs.push([item, item2])
      }
    })
  })
  return pairs
}

export function swapArrayItems<T>(arr: T[], index1: number, index2: number): void {
  const temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

const encoder = new TextEncoder();
export function print(anyVal: any) {
  const str = typeof anyVal == "string" ? anyVal : JSON.stringify(anyVal)
  return Deno.stdout.writeSync(encoder.encode(str))
}

export function println(anyVal: any) {
  print(anyVal)
  print("\n")
}

export function partition<T>(array: Array<T>, pred: (elem: T) => boolean): [T[], T[]] {
  return array.reduce<[T[], T[]]>(([pass, fail], elem) => {
    return pred(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
  }, [[], []]);
}

export function getWithDefault<K, T>(map: Map<K, T>, key: K, defaultVal: T): T {
  let value = map.get(key)
  if (value == undefined) {
      map.set(key, defaultVal)
      value = defaultVal
  }
  return value
}

export function splitAlternating<T>(list: T[]): [T[], T[]] {
  const list1: T[] = [];
  const list2: T[] = [];

  list.forEach((item, index) => {
      if (index % 2 === 0) {
          list1.push(item);
      } else {
          list2.push(item);
      }
  });

  return [list1, list2];
}