import './assets/styles/style.scss';
const customCarousel = document.querySelector('.custom-carousel');

const carouselCards = customCarousel?.querySelectorAll<HTMLElement>(".custom-card");
const tabElements = document.querySelectorAll<HTMLElement>('.tab');

const options: IntersectionObserverInit = {
  root: customCarousel,
  rootMargin: "0px",
  threshold: generateThreshold()
}
const observer = new IntersectionObserver(updateEntries, options)

function updateEntries(entries: IntersectionObserverEntry[]) {
  entries.forEach(entry => {
    const { target, intersectionRatio } = entry;
    const threshold = 0.7;
    target.classList.toggle('current', intersectionRatio > threshold);
    if (intersectionRatio >= threshold) {
      if (target instanceof HTMLElement) {
        const { index } = target.dataset;
        if (!tabIsSelected(Number(index ?? 0))) {
          setTabOfCard(target)
        }
      }
    }
  })
}

function generateThreshold(): number[] {
  let threshold = 0;
  const thresholds: number[] = [];
  while (threshold <= 1) {
    thresholds.push(threshold);
    threshold += 0.1;
  }
  return thresholds;
}

carouselCards?.forEach(card => {
  observer.observe(card);
  if (card instanceof HTMLElement)
    card.addEventListener('click', (e) => {
      setCurrentCard(card);
    })
});

tabElements.forEach(tab => {
  tab.addEventListener('click', () => {
    const { target } = tab.dataset;
    const card = getCardByIndex(Number(target ?? 0));
    if (card) {
      setCurrentCard(card);
    }
  })
})

function getCardByIndex(index: number) {
  const card = [...getCardIterator()].find(card => {
    return card.dataset.index == index.toString();
  })
  if (card instanceof HTMLElement) {
    return card;
  }
  return null;
}

function tabIsSelected(index: number) {
  const currentTab = document.querySelector<HTMLElement>('.tab.current');
  return !!(currentTab?.dataset.target == index.toString());
}

function setCurrentCard(card: HTMLElement) {
  scrollToElement(card);
  setTabOfCard(card);
}

function setTabOfCard(card: HTMLElement) {
  const { index } = card.dataset;
  setCurrentTab(Number(index ?? 0));
}

function scrollToElement(element: HTMLElement) {
  const parent = element.offsetParent;
  const left = element.offsetLeft;
  if (parent) {
    const offsetLeft = elementIsMiddleSibling(element) ? Math.min(((element.parentElement?.clientWidth ?? 250) * -0.04), -24) : 0;
    parent.scrollTo({
      left: Math.max(0, left + offsetLeft),
      behavior: 'smooth'
    })
  }
}

function elementIsMiddleSibling(element: HTMLElement) {
  return !!element.previousElementSibling && !!element.nextElementSibling;
}

function setCurrentTab(index: number) {
  tabElements.forEach((tab: HTMLElement) => {
    const isCurrentTab = tab.dataset.target == index.toString();
    tab.classList.toggle('current', isCurrentTab)
  })
}

function getCardIterator(): Iterable<HTMLElement> {
  let index = 0;
  return {
    [Symbol.iterator]: () => (
      {
        next: (...args: any[]) => {
          const value = carouselCards?.item(index);
          index++;
          if (value) {
            return { value }
          }
          return {
            value: undefined,
            done: true
          }
        }
      }
    )

  }
}