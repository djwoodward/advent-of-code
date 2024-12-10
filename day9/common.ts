export async function print(str: string) {
  await Deno.stdout.write(new TextEncoder().encode(str))
}

export async function println(str: string) {
  await Deno.stdout.write(new TextEncoder().encode(str + "\n"))
}

type Predicate<T> = (arg: T) => boolean;

export function partition<T>(array: Array<T>, pred: (elem: T) => boolean): [T[], T[]] {
  return array.reduce<[T[], T[]]>(([pass, fail], elem) => {
    return pred(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
  }, [[], []]);
}