// Contracts: dense finite-number arrays for twoSum/lowerBound; sorted ascending for lowerBound.
export function twoSum(values, target) {
  const seen = new Map();
  for (let index = 0; index < values.length; index++) {
    const complement = target - values[index];
    if (seen.has(complement)) return [seen.get(complement), index];
    seen.set(values[index], index);
  }
  return null;
}

export function longestUnique(text) {
  const last = new Map();
  let left = 0, best = 0, right = 0;
  for (const value of text) {
    if (last.has(value)) left = Math.max(left, last.get(value) + 1);
    last.set(value, right);
    best = Math.max(best, right - left + 1);
    right++;
  }
  return best;
}

export function lowerBound(values, target) {
  let left = 0, right = values.length;
  while (left < right) {
    const middle = left + Math.floor((right - left) / 2);
    if (values[middle] < target) left = middle + 1;
    else right = middle;
  }
  return left;
}

// Map<Vertex, Iterable<Vertex>>; missing adjacency means a leaf; includes the start vertex.
export function breadthFirst(graph, start) {
  const queue = [start], seen = new Set(queue), result = [];
  for (let head = 0; head < queue.length; head++) {
    const vertex = queue[head];
    result.push(vertex);
    for (const neighbor of graph.get(vertex) ?? []) {
      if (!seen.has(neighbor)) { seen.add(neighbor); queue.push(neighbor); }
    }
  }
  return result;
}
